const maxX = 7;
const maxY = 6;
const vertices = [
    {x: 1, y:5},
    {x: 2, y:3},
    {x: 3, y:2},
    {x: 4, y:1},
    {x: 5, y:2},
    {x: 6, y:6}
];

const handleVertices = (vertices, X, Y) => {
    const multiplier = 5;
    const sortedVertices = vertices.sort((a, b) => b.y - a.y);
    const emptyVertice = Array.from({length: multiplier}, () => " ").join("")
    const filledVertice = emptyVertice.slice(0, -1) + "*"
    const ascii = Array.from({ length: Y + 2 }, () => Array.from({ length: X + 2 }, () => emptyVertice));

    for (let i = 0; i < sortedVertices.length; i++) {
        const x = sortedVertices[i].x;
        const y = Y - sortedVertices[i].y;

        ascii[y + 1][x] = filledVertice;
    }

    ascii[0].fill(Array.from({length: multiplier-1}, () => "+").join(""));
    ascii[Y + 1].fill(Array.from({length: multiplier-1}, () => "+").join(""));

    // Draw left and right borders
    for (let i = 1; i <= Y; i++) {
        ascii[i][0] = '+';
        ascii[i][X + 1] = '+';
    }

    // Print the ASCII art with appropriate spacing
    console.log(ascii.map(row => row.join('')).join('\n'));
};

handleVertices(vertices, maxX, maxY);