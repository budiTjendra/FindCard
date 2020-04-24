
export const generateRandomNumber = (X) => {    
    let numArr = []

    while(numArr.length < X){
      const num = Math.floor(Math.random() * 100)
      if (numArr.indexOf(num) === -1){
        numArr.push(num)
      }  
    }

    return numArr
}

export const generatePairsInArray = (numArr) => {
    let temp = []
    
    temp.push(...numArr)
    temp.push(...numArr) 
    
    let pairArr = []
    
    while (pairArr.length !== numArr.length * 2){
        const randomIndex = Math.floor(Math.random() * temp.length) 
        pairArr.push(temp[randomIndex])
        temp.splice(randomIndex, 1)
    }
    
    return pairArr
    
}

export default {
    generatePairsInArray,
    generateRandomNumber
}