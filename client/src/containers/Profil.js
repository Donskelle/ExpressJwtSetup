import React from 'react';

import Avatar from 'material-ui/Avatar';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';




const styles = {
    classes: {
        bigAvatar: {
            width: 60,
            height: 60,
        },
    },
};

function Profil(props) {
    const { classes } = props;
    let fullName = props.user.first_name + ' ' + props.user.last_name;

    let image = '';
    if (props.user.image) {
        image = <Avatar
            alt={props.user.first_name}
            src={props.user.image}
            className={classNames(classes.avatar, classes.bigAvatar)}
        />
    }
    else {
        const name = props.user.first_name.substring(0, 2);
        image = <Avatar
            className={classNames(classes.bigAvatar)}
        >{name}</Avatar>
    }

    return (
        <div>
            <h1 className='header'>Profile</h1>
            {image}
            <p>{fullName}</p>
        </div>
    )
}


export default withStyles(styles)(Profil);
