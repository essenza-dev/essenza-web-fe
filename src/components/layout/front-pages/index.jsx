// Component Imports
import Header from '@components/layout/front-pages/Header'
import FooterSocialWrapper from './FooterSocialWrapper'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

// Util Imports
import { frontLayoutClasses } from '@layouts/utils/layoutClasses'

const FrontLayout = ({ children }) => {
  // Vars
  const mode = getServerMode()

  return (
    <div className={frontLayoutClasses.root}>
      <Header mode={mode} />
      {children}
      <FooterSocialWrapper />
    </div>
  )
}

export default FrontLayout
