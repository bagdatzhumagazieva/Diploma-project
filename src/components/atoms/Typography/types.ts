import { IBaseAttributeProps, ICoverProps } from 'src/core/components/types';

export interface ITypographyProps extends IBaseAttributeProps<
  HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement | HTMLElement
  >, ICoverProps {
  /**
   * Any existing variant of the typography.
   */
  variant: TypographyVariants | string;
  /**
   * Specific element that will be used to create typography.
   */
  element?: string;
  /**
   * Sets accent color of the button.
   * Look for vars.scss in src/assets to see available options.
   */
  color?: string;
}

/**
 * Typed typography variants
 * that currently implemented in typography.scss.
 */
export enum TypographyVariants {
  'caption' = 'h1',
  'headline' = 'h1',
  'h1' = 'h1',
  'h2' = 'h2',
  'text' = 'p',
  'textmed' = 'p',
  'subtext' = 'p',
  'subtextunderlined' = 'p',
  'subtextmed' = 'p',
  'tag' = 'span',
  'xsmall' = 'span',
  'xsmallunderlined' = 'span',
  'xsmallmed' = 'span',
  'xxsmall' = 'span',
  'xxsmallmed' = 'span',
}
