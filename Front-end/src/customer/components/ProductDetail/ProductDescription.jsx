import React from 'react'

const ProductDescription = ({ description }) => {
    const paragraphs = description.split('\n').filter(paragraph => paragraph.trim() !== '');

  return (
    <div className="space-y-2">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-base text-gray-900">
            {paragraph}
          </p>
        ))}
      </div>
  )
}

export default ProductDescription

