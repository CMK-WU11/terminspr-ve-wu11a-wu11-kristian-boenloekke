export default async function Ratings({classId}) {
    const ratings = await fetch(`http://localhost:4000/api/v1/classes/${classId}/ratings`).then(r => r.json())
    
    const averageRating = Math.round(ratings.reduce((acc, rating) => acc + rating.rating / ratings.length, 0) * 2) / 2
    
    return (
          
        <div className="flex w-2/3">
          {[1, 2, 3, 4, 5].map(rating => {
            const isFull = averageRating >= rating
            const isHalf = averageRating >= rating - 0.5 && averageRating < rating
    
            return (
              <div
                key={rating}
                className="relative w-5 h-5 border-r-[0.2px] "
              >
                {isFull && (
                  <div className="absolute inset-0 bg-customOrange" />
                )}
                {isHalf && (
                  <div className="absolute inset-0 w-1/2 bg-customOrange" />
                )}
                {isHalf && (
                  <div className="absolute inset-0 left-1/2 w-1/2 bg-customGray"  />
                )}
                {!isFull && !isHalf && (
                  <div className="absolute inset-0 bg-customGray" />
                )}
              </div>
            )
          })}
        </div>
        
      )
}