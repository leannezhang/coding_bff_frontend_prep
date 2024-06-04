 // iteratively
//  function depthFirstSearch(graph, source) {
//     let result = [];
//     let stack = [source];
//     let visited = new Set();

//     while (stack.length > 0 ) {
//         let current = stack.pop();
//         // make sure it can handle cyclic graphs
//         if (!visited.has(current)) {
//             visited.add(current);
//             result.push(current);
//         }
//         let neighbors = graph[current] ?? [];
//         // since the print order is in order, I will need to insert the neighbor to stack in reverse
//         for (let i=neighbors.length-1; i>=0; i-- ) {
//             let node = neighbors[i];
//             if (!visited.has(node)) {
//                 stack.push(node);
//             }
//         }
//     }
//     console.log(result)
//     return result;
// }

// recursively
function depthFirstSearch(graph, source, result=[], visited=new Set()) {

    let neighbors = graph[source];
    if (!visited.has(source)) {
        visited.add(source);
        result.push(source);
    }

    for (let i=0; i < neighbors.length; i++) {
        let current = neighbors[i];
        if (!visited.has(current)) {
            depthFirstSearch(graph, current, result, visited);
        }
    }
    return result;
}


const graph1 = {
    A: ['B', 'C', 'D'],
    B: ['E', 'F'],
    C: ['G', 'H'],
    D: ['I', 'J'],
    E: ['D'],
    F: [],
    G: [],
    H: [],
    I: [],
    J: [],
  };
  console.log('the end', depthFirstSearch(graph1, 'A')); // ['A', 'B', 'E', 'D', 'I', 'J', 'F', 'C', 'G', 'H']
  console.log(depthFirstSearch(graph1, 'B')); // ['B', 'E', 'D', 'I', 'J', 'F']

  const graph2 = {
    A: ['B', 'C'],
    B: ['D', 'E'],
    C: ['F', 'G'],
    D: [],
    E: [],
    F: [],
    G: [],
  };
  depthFirstSearch(graph2, 'A'); // ['A', 'B', 'D', 'E', 'C', 'F', 'G']
  depthFirstSearch(graph2, 'E'); // ['E']


depthFirstSearch(
      { A: ['D', 'E'], B: [], C: [], D: ['B'], E: ['C'] },
      'A',
    ); // (['A', 'D', 'B', 'E', 'C']);

depthFirstSearch({
        A: ['D', 'E'],
        B: ['A', 'B', 'C', 'D', 'E'],
        C: [],
        D: ['B'],
        E: ['C'],
        },
        'A'); // (['A', 'D', 'B', 'C', 'E']);