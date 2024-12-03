const data = await Deno.readTextFile("corrupted-data.txt")

const multiplyRegex = /mul\((\d{1,3}),(\d{1,3})\)/gm

const matches = data.matchAll(multiplyRegex)

let total = 0

for (const match of matches) {
  const [_, num1, num2 ] = match
  total += Number(num1) * Number(num2)
}

// answer to part 1
console.log(total)