import type Progress from "./Progress.vue"

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
  contactor?: boolean
  contactorWidth?: number
}

export type ProgressInstance = InstanceType<typeof Progress>
