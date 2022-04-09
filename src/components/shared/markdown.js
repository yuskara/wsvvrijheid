/* eslint-disable react/display-name */
import { chakra } from '@chakra-ui/react'
import { MDXRemote } from 'next-mdx-remote'

import { Navigate } from '~components'

const MarkdownComponents = {
  h1: props => <chakra.h1 apply='mdx.h1' {...props} />,
  h2: props => <chakra.h2 apply='mdx.h2' {...props} />,
  h3: props => <chakra.h3 as='h3' apply='mdx.h3' {...props} />,
  h4: props => <chakra.h4 as='h4' apply='mdx.h4' {...props} />,
  hr: props => <chakra.hr apply='mdx.hr' {...props} />,
  strong: props => <chakra.span fontWeight={600} {...props} />,
  a: props => (
    <Navigate {...props}>
      <chakra.a apply='mdx.a'>{props.children}</chakra.a>
    </Navigate>
  ),
  p: props => <chakra.p apply='mdx.p' {...props} />,
  ul: props => <chakra.ul apply='mdx.ul' {...props} />,
  ol: props => <chakra.ol apply='mdx.ul' {...props} />,
  li: props => <chakra.li pb='4px' {...props} />,
  blockquote: props => <chakra.blockquote apply='mdx.blockquote' {...props} />,
}

export const Markdown = ({ source }) => (
  // TODO Might be extended with custom components
  <MDXRemote {...source} components={{ ...MarkdownComponents }} />
)
