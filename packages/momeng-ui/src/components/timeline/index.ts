import { withInstall, withNoopInstall } from '../../utils'
import Timeline from './Timeline.vue'
import TimelineItem from './TimelineItem.vue'

export const MoTimeline = withInstall(Timeline, { TimelineItem })
export const MoTimelineItem = withNoopInstall(TimelineItem)
export default MoTimeline
export * from './timeline'
