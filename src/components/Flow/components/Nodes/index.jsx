import { Children, cloneElement } from 'react'

const Nodes = (props) => {
  const { children, ...otherProps } = props
  return Children.map(
    children,
    child => cloneElement(child, otherProps)
  )
}

export default Nodes