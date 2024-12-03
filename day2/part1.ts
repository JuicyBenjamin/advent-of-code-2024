const data = await Deno.readTextFile("reactor-data.txt")

const dataSetArray = data.split('\n')

let amountOfSafeReports = 0
let dataSetChecked = 0

dataSetArray.forEach((dataSet) => {
  const levels = dataSet.split(' ')
  let prevLevel = 0
  let direction: 'rising' | 'falling' | '' = ''
  try {
    levels.forEach((curr, index) => {
      const currLevel = Number(curr)

      // Setting the baseline
      if(index === 0) {
        prevLevel = currLevel
        return
      }

      // In the case where it's the same
      if (currLevel === prevLevel) {
        throw new Error('Two levels were the same')
      }

      // In the case where it's rising
      if (currLevel > prevLevel) {
        // setting initial direction
        if (direction === '') {
          direction = "rising"
        }

        // Checking if direction is continuing to be rising
        if (direction === 'falling') {
          throw new Error('Was rising but fell')
        }
        // Checking if direction is rising by more than 3
        if((currLevel - prevLevel) > 3) {
          throw new Error(`Was rising by more than 3, was rising by: ${String(currLevel - prevLevel)}, , ${dataSet}`)
        }
        prevLevel = currLevel
        return
      }

      // In the case where it's falling
      if (currLevel < prevLevel) {
        // setting initial direction
        if(direction === '') {
          direction = 'falling'
        }
        if (direction === 'rising') {
          throw new Error('Was falling but rose')
        }
        if((prevLevel - currLevel) > 3) {
          throw new Error(`Was falling by more than 3, was falling by: ${prevLevel - currLevel}, ${dataSet}`)
        }
        prevLevel = currLevel
        return
      }
    })
    amountOfSafeReports ++
    console.log('safe ', dataSet)
  } catch(error) {
    if (error instanceof Error) {
      console.log('unsafe ', error.message);
    } else {
      console.log("An unknown error occurred");
    }
  }
  dataSetChecked ++
})

// Part 1 answer
console.log(amountOfSafeReports)

// debug
console.log({ dataSetLength: dataSetArray.length, dataSetChecked })