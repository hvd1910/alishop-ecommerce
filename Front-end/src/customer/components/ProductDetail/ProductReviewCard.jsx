import { Avatar, Box, Grid, Rating } from '@mui/material'
import React from 'react'
import { ConvertDate } from '../../../admin/components/BodyMain/Convert/Convert'

const ProductReviewCard = ({comment}) => {
  return (
    <div >
      <Grid container spacing={2} gap={3}>
        <Grid item xs={1}>
            <Box>
            <Avatar className='text-white' sx={{width:56, height:56, bg:"#9155fd"}}>{comment?.name.split(' ').map(word => word.charAt(0)).join('')}</Avatar>
            </Box>
        </Grid>

        <Grid item xs={9}>
            <div className='space-y-2'>
                <div>
                    <p className='font-semibold text-lg'>{comment?.name}</p>
                    <p className='opacity-70'>{ConvertDate(comment.updatedAt)}</p>
                </div>
            </div>

            <Rating value={comment?.rating} name='half-rating' readOnly precision={.5}></Rating>
            <p>{comment?.content}</p>
        </Grid>
      </Grid>
    </div>
  )
}

export default ProductReviewCard
