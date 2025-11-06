import dynamic from 'next/dynamic'

// Override default ignores of eslint-config-next.
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

export default ReactPlayer
