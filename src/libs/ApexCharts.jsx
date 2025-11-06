import dynamic from 'next/dynamic'

// Override default ignores of eslint-config-next.
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default Chart
