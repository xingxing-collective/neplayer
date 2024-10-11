import type Progress from "./progress.vue"

export type ProgressProps = {
  /**
   * percentage
   */
  percentage: number
  /**
   * the width of progress bar
   */
  strokeWidth?: number
  /**
   * control the animation duration of indeterminate progress or striped flow progress
   */
  duration?: number
  /**
   * background color of progress bar.
   */
  color?: string

  /**
   * always show contactor
   */
  alwaysContactor?: boolean
  contactor?: boolean
  contactorWidth?: number
}

export type ProgressEmits = {
  onPercentChange: [percent: number]
}

export type ProgressInstance = InstanceType<typeof Progress>
