// Wrapper
interface NumberWithLogs {  
  result: number;
  logs: string[];
}

// Wrap function (allows entry into the monad ecosystem; also called return, pure, and unit)
function wrapWithLogs(x: number) {
  return {
    result: x,
    logs: [],
  };
}

// Run function (runs transformations on monadic values; also called bind, flatMap, and >>=)
function runWithLogs(
  input: NumberWithLogs,
  transform: (_: number) => NumberWithLogs
): NumberWithLogs {
  const newNumberWithLogs = transform(input.result);
  return {
    result: newNumberWithLogs.result,
    logs: input.logs.concat(newNumberWithLogs.logs),
  };
}

// Transformation functions (the actual mathematical operator functions)
function square(x: number): NumberWithLogs {
  return {
    result: x * x,
    logs: [`Squared ${x} to get ` + `${x * x}`],
  };
}

function addOne(x: number): NumberWithLogs {
  return {
    result: x + 1,
    logs: [`Added 1 to ${x} to get ${x + 1}`],
  };
}

const a = wrapWithLogs(5)
const b = runWithLogs(a, square)
const c = runWithLogs(b, square)
const d = runWithLogs(c, addOne)
console.log(d)

