import { styled } from 'solid-styled-components'
import type { Component } from 'solid-js'

interface RecipeCardProps {
  recipe: {
    name: string
    minutes: number
  }
}

const RecipeCard: Component<RecipeCardProps> = (props) => {
  return (
    <RecipeCardWrapper>
      <RecipeCardInner>
        <RecipeTime>
          { props.recipe.minutes }
        </RecipeTime>
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

const RecipeTime = styled('div')`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: hsl(25, 100%, 47%);
  box-shadow: 0px 4px 10px -2px #4A1F00;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
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
