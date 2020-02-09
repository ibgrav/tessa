import { useContext } from 'react';
import { AppContext } from './AppContext';

const useApp = () => {
    const [state, setState] = useContext(AppContext);

    function setMeta(meta) {
        setState(state => ({ ...state, meta }));
    }

    function toggleDark(set) {
        const isDark = (set === undefined) ? !state.isDark : set;
        setState(state => ({ ...state, isDark }));
        return isDark;
    }

    return {
        setMeta,
        toggleDark,
        meta: state.meta,
        isDark: state.isDark
    }
}

export default useApp;