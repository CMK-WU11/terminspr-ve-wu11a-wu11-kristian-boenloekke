export default async function Ratings({classId}) {
    const ratings = await fetch(`http://localhost:4000/api/v1/classes/${classId}/ratings`).then(r => r.json())
    
    const averageRating = Math.round(ratings.reduce((acc, rating) => acc + rating.rating / ratings.length, 0) * 2) / 2
    console.log('average-rating', averageRating);
    
    return (
          
        <div className="flex">
          {[1, 2, 3, 4, 5].map(rating => {
            const isFull = averageRating >= rating
            const isHalf = averageRating >= rating - 0.5 && averageRating < rating
    
            return (
              <div
                key={rating}
                className="relative w-7 h-7 border-r-2 "
              >
                {isFull && (
                  <div className="absolute inset-0 bg-customOrange" />
                )}
                {isHalf && (
                  <div className="absolute inset-0 w-1/2 bg-customOrange" />
                )}
                {isHalf && (
                  <div className="absolute inset-0 left-1/2 w-1/2 bg-white"  />
                )}
                {!isFull && !isHalf && (
                  <div className="absolute inset-0 bg-white" />
                )}
              </div>
            )
          })}
        </div>
        
      )
}