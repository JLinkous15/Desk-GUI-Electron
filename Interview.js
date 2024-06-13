// type Vertice = {x: number, y: number}

const maxX = 7
const maxY = 6
// const vertices: Vertice[] = [
const vertices = [
    {x: 1, y:5},
    {x: 2, y:3},
    {x: 3, y:2},
    {x: 4, y:1},
    {x: 5, y:2},
    {x: 6, y:6}
]

/*
Expected Ascii Output:
+++++++++++++++++++++++++++++++++++++
+                             *     +
+    *                              +
+                                   +
+         *                         +
+              *         *          +
+                   *               +
+++++++++++++++++++++++++++++++++++++
 */

// const handleVertices = (vertices: Vertice[]): void => {
const handleVertices = (vertices, X, Y) => {
    const multiplier = 5
    const sortedVertives = vertices.sort((a, b) => b.y-a.y)
    const emptyVertice = Array.from({length: multiplier}, () => " ").join("")
    const filledVertice = emptyVertice.slice(0, -1) + "*"
    const asciiHeader = Array.from({ length: maxX * multiplier + 2 }, () => "+").join("")
    let asciiRow = Array.from({ length: X }, () => emptyVertice) 
    let ascii = Array.from({length: maxY + 2}, () => asciiHeader)
    let verticePointer = 0
    for (let i=0; i<Y; i++) {
        let newRow = [...asciiRow]
        if (sortedVertives[verticePointer] && i+1 !== sortedVertives[verticePointer].y) {
            newRow.splice(sortedVertives[verticePointer].x - 1, 1, filledVertice)
            
        } else {
            verticePointer--
        }
        newRow.unshift("+")
        newRow.push("+")
        newRow = newRow.join("")
        ascii.splice(i+1, 1, newRow)
        verticePointer++
    }
    console.log(sortedVertives)
        console.log(ascii.join("\n"))
    }

handleVertices(vertices, maxX, maxY)

//Doesn't work. Rows are constructing off the x axis, which results in loss of shared Y-axis values OR rotates the chart 90 degrees. Going to try nested array.