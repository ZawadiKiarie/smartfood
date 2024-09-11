import * as React from 'react';
import PropTypes from 'prop-types';
import Badge, { badgeClasses } from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';

function MenuButton({ showBadge=false, ...props }){
  const {...iconButtonProps } = props;
  return (
    <Badge
      color="error"
      variant="dot"
      invisible={!showBadge}
      sx={{ [`& .${badgeClasses.badge}`]: { right: 2, top: 2 } }}
    >
      <IconButton size="small" {...iconButtonProps} />
    </Badge>
  )
}

MenuButton.propTypes = {
  showBadge: PropTypes.bool,
}

export default MenuButton;