import OptionMenu from '@core/components/option-menu'

const ActionMenu = ({ actions }) => {
  return (
    <OptionMenu iconButtonProps={{ size: 'medium' }} iconClassName='text-textSecondary text-lg' options={actions} />
  )
}

export default ActionMenu
