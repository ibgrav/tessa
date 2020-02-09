import { useContext } from 'react';
import { AppContext } from './AppContext';

const useApp = () => {
    const [state, setState] = useContext(AppContext);

    function setMeta(meta) {
        const theme = {
            text: {
                primary: meta.data.text_primary,
                secondary: meta.data.text_secondary
            },
            link: {
                primary: meta.data.link_primary,
                active: meta.data.link_active
            },
            background: {
                primary: meta.data.background_primary,
                secondary: meta.data.background_secontary
            }
        }

        setState(state => ({ ...state, meta, theme }));
    }

    function toggleDark(set) {
        const isDark = (set === undefined) ? !state.isDark : set;
        setState(state => ({ ...state, isDark }));
        return isDark;
    }

    function setEvents() {
        setState(state => ({ ...state, eventsSet: true }));
    }

    return {
        setMeta,
        toggleDark,
        setEvents,
        currentPrimary: state.meta ? state.isDark ? 'secondary' : 'primary' : 'secondary',
        theme: state.theme,
        eventsSet: state.eventsSet,
        meta: state.meta,
        isDark: state.isDark
    }
}

export default useApp;