import { styled } from 'solid-styled-components'
import { colors } from '../lib/colors'
import type { Component } from 'solid-js'

const LoadingSpinner = styled('div')`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid ${colors.primary[80]};
  border-top-color: ${colors.primary[10]};
  animation: spinner .6s linear infinite;

  @keyframes spinner {
    to {transform: rotate(360deg);}
  }
`

export default LoadingSpinner
