/**
 * Import @wordpress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  InspectorControls,
  __experimentalDateFormatPicker as DateFormatPicker,
  __experimentalPublishDateTimePicker as PublishDateTimePicker,
  BlockControls
} from "@wordpress/block-editor";

import {
  PanelBody,
  ToggleControl,
  ToolbarGroup,
  ToolbarButton,
  Dropdown
} from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import { useMemo, useState } from "@wordpress/element";
import { dateI18n, getSettings as getDateSettings } from "@wordpress/date";

/**
 * Import andt components, dependencies & configuration
 */
import { Typography, ConfigProvider } from "antd";
import { edit } from "@wordpress/icons";

import { updateAttributes, generateStyles } from "../../shared";
import { textAttributes } from "../../shared/attributes";
import antdTheme from "../../../../../themes/headless/antd-theme.json";
import { BlockVisibility } from "../../block-editor/block-visibility";
import { BlockStyles } from "../../block-editor/block-styles";
import { TextControls } from "../../shared/controls";

const { Text } = Typography;

/**
 * Import editor styles
 */
import "./editor.scss";

/**
 * Gutenberg Edit component
 */
export default function Edit({
  attributes,
  setAttributes,
  clientId,
  context: { postId, postType: postTypeSlug, queryId },
}) {
  // Used by the Gutenberg editor to save & output blocks properly
  const blockProps = useBlockProps({
    className: `gutenberg-ant-design--${clientId}`,
  });

  // Merge the default attributes with the saved ones
  const savedAttributes = { ...textAttributes, ...attributes };

  // Component states
	
  const isDescendentOfQueryLoop = Number.isFinite(queryId);
  // used to display date popup that let's the user to edit the date outside Query loop
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  // Memoize popoverProps to avoid returning a new object every time.
  const popoverProps = useMemo(
    () => ({ anchor: popoverAnchor }),
    [popoverAnchor]
  );
  const dateSettings = getDateSettings();
  const [siteFormat = dateSettings.formats.date] = useEntityProp(
    "root",
    "site",
    "date_format"
  );
  const [siteTimeFormat = dateSettings.formats.time] = useEntityProp(
    "root",
    "site",
    "time_format"
  );
  const [date, setDate] = useEntityProp(
    "postType",
    postTypeSlug,
    savedAttributes.api.displayType ? savedAttributes.api.displayType : "date",
    postId
  );

  let postDate = date ? (
    <time dateTime={dateI18n("c", date)} ref={setPopoverAnchor}>
      {dateI18n(savedAttributes.api.format || siteFormat, date)}
    </time>
  ) : (
    __("Post Date")
  );

  // Component processing
  const {
    code,
    copyable,
    disabled,
    keyboard,
    mark,
    italic,
    strong,
    type,
    underline,
  } = savedAttributes.api;

  // Component helpers

  /**
   * Ant Design component props
   *
   * These should match the available API properties and their default for the
   * corresponding Ant Design component. Note: Some props like that accept
   * functions or more dynamic values like functions of ReactNodes may need to
   * be omitted or parsed.
   */
  const antdComponentProps = {
    code,
    copyable,
    disabled,
    keyboard,
    mark,
    italic,
    strong,
    type,
    underline,
    delete: savedAttributes.api.delete,
  };

  return (
    <>
      <ConfigProvider theme={antdTheme}>
        <Text {...blockProps} {...antdComponentProps}>
          {postDate}
        </Text>
        <style>{generateStyles(savedAttributes, clientId)}</style>
        <BlockControls group="block">
        {date && !isDescendentOfQueryLoop && (
          <ToolbarGroup>
						{/** @TODO: Find a way to replace this with Ant date picker. */}
            <Dropdown
              popoverProps={popoverProps}
              renderContent={({ onClose }) => (
                <PublishDateTimePicker
                  currentDate={date}
                  onChange={setDate}
                  is12Hour={is12HourFormat(siteTimeFormat)}
                  onClose={onClose}
                />
              )}
              renderToggle={({ isOpen, onToggle }) => {
                const openOnArrowDown = (event) => {
                  if (!isOpen && event.keyCode === DOWN) {
                    event.preventDefault();
                    onToggle();
                  }
                };
                return (
                  <ToolbarButton
                    aria-expanded={isOpen}
                    icon={edit}
                    title={__("Change Date")}
                    onClick={onToggle}
                    onKeyDown={openOnArrowDown}
                  />
                );
              }}
            />
          </ToolbarGroup>
        )}
        </BlockControls>
        <InspectorControls>
          <BlockVisibility
            attributes={savedAttributes}
            setAttributes={setAttributes}
          />
          <PanelBody title={__("Options")} initialOpen={false}>
            <DateFormatPicker
              format={savedAttributes.api.format}
              defaultFormat={siteFormat}
              onChange={(value) =>
                updateAttributes(
                  "api",
                  "format",
                  value,
                  savedAttributes,
                  setAttributes
                )
              }
            />
            <ToggleControl
              label={__("Display last modified date")}
              onChange={(value) =>
                updateAttributes(
                  "api",
                  "displayType",
                  value ? "modified" : "date",
                  savedAttributes,
                  setAttributes
                )
              }
              checked={savedAttributes.api.displayType === "modified"}
            />
          </PanelBody>
          <TextControls
            updateAttributes={updateAttributes}
            savedAttributes={savedAttributes}
            setAttributes={setAttributes}
          />
          <BlockStyles
            styles={savedAttributes.styles}
            onChange={(screenSize, attribute, value) => {
              updateAttributes(
                "styles",
                screenSize,
                {
                  ...savedAttributes.styles[screenSize],
                  [attribute]: value,
                },
                savedAttributes,
                setAttributes
              );
            }}
            enabledScreenSizes={savedAttributes.visibility}
          />
        </InspectorControls>
      </ConfigProvider>
    </>
  );
}

export function is12HourFormat( format ) {
  // To know if the time format is a 12 hour time, look for any of the 12 hour
  // format characters: 'a', 'A', 'g', and 'h'. The character must be
  // unescaped, i.e. not preceded by a '\'. Coincidentally, 'aAgh' is how I
  // feel when working with regular expressions.
  // https://www.php.net/manual/en/datetime.format.php
  return /(?:^|[^\\])[aAgh]/.test( format );
}
