import { styled } from 'solid-styled-components'
import { lazy } from "solid-js"
import type { Component } from 'solid-js'

interface RecipeCardProps {
  recipe: {
    name: string
    minutes: number
  }
}

const RecipeCard: Component<RecipeCardProps> = (props) => {
  const AlarmIcon = lazy(() => import('../assets/alarm.svg'))

  return (
    <RecipeCardWrapper>
      <RecipeCardInner>
        <RecipeTimeBadge>
          <AlarmIcon />
          <RecipeMinutes>
            { props.recipe.minutes }
          </RecipeMinutes>
        </RecipeTimeBadge>
        <RecipePhoto
          photoURL='https://s01.sgp1.cdn.digitaloceanspaces.com/article/143395-pysnzzzleh-1593090551.jpg'
        />
        <RecipeDetails>
          { props.recipe.name }
        </RecipeDetails>
      </RecipeCardInner>
    </RecipeCardWrapper>
  )
}

export default RecipeCard

/**
 * Styles
 */

const RecipeCardWrapper = styled('div')`
  flex-basis: 25%;
`

const RecipeCardInner = styled('div')`
  background-color: hsl(24, 19%, 95%);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  min-height: 180px;
  margin: 5px;
  overflow: hidden;
  position: relative;
`

const RecipeTimeBadge = styled('div')`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: hsl(25, 100%, 47%);
  box-shadow: 0px 4px 10px -2px #4A1F00;
  color: white;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 20px;

  svg { 
    fill: white;
    margin-right: 5px;
  }
`

const RecipeMinutes = styled('p')`
  margin: 0;
`

interface RecipePhotoProps {
  photoURL: string
}

const RecipePhoto = styled('div')<RecipePhotoProps>`
  background-image: url(${(props) => props.photoURL});
  background-size: cover;
  width: 100%;
  height: 130px;
`
const RecipeDetails = styled('div')`
  margin: 10px;
  flex-grow: 1;
  display: flex;
  align-items: center;
`
