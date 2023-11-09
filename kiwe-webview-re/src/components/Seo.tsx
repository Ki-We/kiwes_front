import Head from 'next/head'

interface Props {
  title?: string
  children?: React.ReactNode
}

export default function Seo({ title, children }: Props) {
  return (
    <Head>
      <title> 키위즈 {title && ` | ${title}`} </title>
      {children}
    </Head>
  )
}
