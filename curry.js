function curry(fn, args, holes) {
    length = fn.length;
    args = args || [];
    holes = holes || [];


    return function() {
        let _args = args.slice(0),
            _holes = holes.slice(0),
            argsLen = args.length,
            holesLen = holes.length,
            arg, i, index = 0;


        for (let i = 0; i < arguments.length; i++) {
            arg = arguments[i]

            if (arg === _ && holesLen) {
                index++
                if (index > holesLen) {
                    _args.push(arg)
                    _holes.push(argsLen - 1 + index - holesLen)
                }
            } else if (arg === _) {
                _args.push(arg)
                _holes.push(argsLen + i)
            } else if (holesLen) {
                if (index >= holesLen) {
                    _args.push(arg)
                } else {
                    _args.splice(_holes[index], 1, arg)
                    _holes.splice(index, 1)
                }
            } else {
                _args.push(arg)
            }
        }

        if (_holes.length || _args.length < length) {
            return curry.call(this, fn, _args, _holes);
        } else {
            return fn.apply(this, _args);
        }
    }
}