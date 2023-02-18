import React from 'react'
import dayjs from 'dayjs'
import Calendar, { Props as ICalendarProps } from './Calendar'
import { Omit, Merge } from '../../_utils/DateUtil'

type CalendarProps = Merge<
  Omit<ICalendarProps, 'base' | 'onChange' | 'selected'>,
  {
    /** 显示视图的个数 */
    showMonthCnt?: number
  }
>

interface IProps {
  /** 日视图下是否多选 */
  multiple?: boolean
}

interface State {
  selected: dayjs.Dayjs[]
}

type Props = CalendarProps & IProps
/**
 * 日历。目前支持年/月/日切换。
 */
export class CalendarSelectedController extends React.Component<Props, State> {
  public static defaultProps = {
    /** 默认不多选 */
    multiple: false,
    /** 默认为日视图 */
    view: 'day',
  }

  public state = {
    selected: [],
  }

  public handleChange = (
    year?: dayjs.Dayjs,
    month?: dayjs.Dayjs,
    date?: dayjs.Dayjs
  ) => {
    const { multiple } = this.props
    if (date) {
      this.setState({
        selected: multiple ? [...this.state.selected, date] : [date],
      })
    } else if (year) {
      this.setState({
        selected: multiple ? [...this.state.selected, year] : [year],
      })
    } else if (month) {
      this.setState({
        selected: multiple ? [...this.state.selected, month] : [month],
      })
    }
  }

  public handleClear = () => {
    this.setState({
      selected: [],
    })
  }

  public render() {
    const { selected } = this.state
    return (
      <div>
        <Calendar
          {...this.props}
          selected={selected}
          onChange={this.handleChange}
        />
        {this.props.multiple && (
          <button onClick={this.handleClear}>Clear</button>
        )}
      </div>
    )
  }
}

export default CalendarSelectedController
