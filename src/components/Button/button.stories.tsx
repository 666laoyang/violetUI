import React, { ReactNode } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Button from './button'
import Icon from '../Icon'

export default {
  title: 'Button 按钮',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>

//default button
const Template: ComponentStory<typeof Button> = args => (
  <Button {...args}></Button>
)
export const Default = Template.bind({})
Default.args = {
  children: 'Default Button',
  onClick: () => console.log(123),
}

//primary Button
export const Primary = Template.bind({})
Primary.args = {
  btnType: 'primary',
  children: 'Primary Button',
}

//danger Button
export const Danger = Template.bind({})
Danger.args = {
  btnType: 'danger',
  children: 'Danger Button',
}

//link Button
export const Link = Template.bind({})
Link.args = {
  btnType: 'link',
  children: 'Link Button',
  href: 'https://google.com',
}

//text Button
export const Text = Template.bind({})
Text.args = {
  btnType: 'text',
  children: 'Text Button',
}
//icon button
export const IconButton = (args: any) => (
  <Button btnType="primary">
    <Icon icon="upload" /> Icon Button
  </Button>
)
IconButton.storyName = 'Icon'

//export const
//icon button

export const DashButton = (args: any) => (
  <Button btnType="dash">Dashed Button</Button>
)
DashButton.storyName = 'Dash'

//Large Button
export const Large = Template.bind({})
Large.args = {
  size: 'lg',
  children: 'Large Button',
}
//small Button
export const Small = Template.bind({})
Small.args = {
  size: 'sm',
  children: 'Small Button',
}
