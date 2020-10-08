import { useCallback, useState } from "react";

const useInput = () => {
    const [value, setValue] = useState('');
    const onInput = useCallback(e => setValue(e.target.value), []);
    return [value, onInput];
};

export default useInput;
