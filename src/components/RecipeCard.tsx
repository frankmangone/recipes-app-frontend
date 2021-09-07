import { styled } from 'solid-styled-components'
import { lazy } from "solid-js"
import { useNavigate } from 'solid-app-router'
import { colors } from '@lib/colors'
import type { Component } from 'solid-js'

interface RecipeCardProps {
  recipe: {
    id: number
    name: string
    minutes: number
  }
}

const RecipeCard: Component<RecipeCardProps> = (props) => {
  const AlarmIcon = lazy(() => import('../assets/alarm.svg'))
  const navigate = useNavigate()

  const navigateToRecipe = () => {
    navigate(`/recipe/${props.recipe.id}`, { replace: true })
  }

  return (
    <RecipeCardWrapper>
      <RecipeCardInner onClick={navigateToRecipe}>
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
  background-color: ${colors.primaryUnsaturated[90]};
  border-radius: 10px;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  min-height: 180px;
  margin: 5px;
  overflow: hidden;
  position: relative;

  &:hover {
    background-color: ${colors.primaryUnsaturated[80]};
  }
`

const RecipeTimeBadge = styled('div')`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: ${colors.primary[50]};
  box-shadow: 0px 4px 10px -2px ${colors.primary[10]};
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
  margin: 1rem 1.2rem;
  flex-grow: 1;
  display: flex;
  align-items: center;
`
