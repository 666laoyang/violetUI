import React, { ReactNode } from 'react'
import classNames from 'classnames'
import _ from 'lodash'

export type ButtonSize = 'lg' | 'sm'
export type ButtonType =
  | 'primary'
  | 'default'
  | 'danger'
  | 'link'
  | 'text'
  | 'dash'
interface BaseButtonProps {
  /**添加自定义类名 */
  className?: string
  /**设置按钮失效状态 */
  disabled?: boolean
  /**设置按钮尺寸 */
  size?: ButtonSize
  /**设置按钮类型 */
  btnType?: ButtonType
  /**设置按钮上的文字 */
  children?: ReactNode
  /**点击跳转的地址，指定此属性 button 的行为和 a 链接一致 */
  href?: string
  /**点击按钮时的回调 */
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | undefined
}

type NativeButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<AnchorButtonProps>

/**
 * >按钮用于开始一个即时操作。
 *
 * ### 何时使用
 * 标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。
 * 在violetUI我们提供了7种按钮
 * - 主按钮：用于主行动点，一个操作区域只能有一个主按钮。
 * - 默认按钮：用于没有主次之分的一组行动点。
 * - 文本按钮：用于最次级的行动点。
 * - 链接按钮：一般用于链接，即导航至某位置。
 * - 虚线按钮：常用于添加操作。
 * - 危险按钮：删除/移动/修改权限等危险操作，一般需要二次确认。
 * - 禁用按钮：行动点不可用的时候，一般需要文案解释。
 * - 图标按钮：可以通过Icon组件，为按钮提供各式各样的图标选择。
 *
 * 除了默认按钮尺寸，还提供了两种尺寸配合使用
 * - Large Button
 * - Samll Button
 */

export const Button = (props: ButtonProps) => {
  const { btnType, className, disabled, size, children, href, ...restProps } =
    props

  const debounceClick = () => {
    console.log('enter handler')
    console.log([props.onClick], '--onclick')
    if (!props.onClick) return
    return _.throttle(props.onClick, 2000)
  }

  const debouncedClick = debounceClick()

  //violetButton,violetButton-lg,violetButton-primary,
  const cls = classNames('violetButton', className, {
    [`violetButton--${btnType}`]: btnType,
    [`violetButton--${size}`]: size,
    'violetButton--disabled': btnType === 'link' && disabled,
  })
  if (btnType === 'link' && href) {
    return (
      <a className={cls} href={href} {...restProps}>
        {children}
      </a>
    )
  } else {
    return (
      <button
        className={cls}
        disabled={disabled}
        {...restProps}
        onClick={e => {
          if (debouncedClick) {
            debouncedClick(e)
          }
        }}
      >
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default',
}

export default Button
