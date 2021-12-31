import React from 'react'
import { useHistory } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const Head=()=>{
    const history=useHistory()
    return(<>
        <Menu size='massive' widths={2} borderless className="top-menu">
        <Menu.Menu className="menu-text">
          <Menu.Item
            position='right'
            name='Add Post'
            onClick={()=>history.push('/')}
          />
          <Menu.Item
            name='Feeds'
            onClick={()=>history.push('/feeds')}
          />
        </Menu.Menu>
      </Menu>
    </>)
}

export default Head