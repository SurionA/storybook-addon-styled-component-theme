import { List } from "immutable";
import * as React from "react";
import { branch, compose, lifecycle, renderNothing, withHandlers, withState } from "recompose";
import { Theme } from "./types/Theme";
import { Style } from "./types/Style";

export interface ThemeProps {
    channel: any;
    api: any;
}

interface ThemeState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    themes: List<Theme>;
    setThemes: (themes: List<Theme>) => void;
}

interface ThemeHandler {
    onSelectTheme: (theme: Theme) => void;
    onReceiveThemes: (theme: Theme[]) => void;
}

interface ThemeStyles {
    style: Style
}



type BaseComponentProps = ThemeProps & ThemeState & ThemeHandler & ThemeStyles;

const BaseComponent: React.SFC<BaseComponentProps> = ({ onSelectTheme, themes, theme, style }) => {
    const {
        RowStyle: CustomRowStyle = {},
        ButtonStyle: CustomButtonStyle = {},
        SelectedButtonStyle: CustomSelectedButtonStyle = {}
    } = style;
    const ExtendStyle = {
        RowStyle: { ...RowStyle, ...CustomRowStyle },
        ButtonStyle: { ...ButtonStyle, ...CustomButtonStyle },
        SelectedButtonStyle: { ...SelectedButtonStyle, ...CustomSelectedButtonStyle }
    }

    return (
        <div style={ExtendStyle.RowStyle}>
            {themes.map((th, i) => {
                const buttonStyle = th === theme ? ExtendStyle.SelectedButtonStyle : ExtendStyle.ButtonStyle;
                return <div style={buttonStyle} key={i} onClick={() => onSelectTheme(th)}>{th.name}</div>;
            }).toArray()}
        </div>
    );
};

export const Themes = compose<BaseComponentProps, ThemeProps>(
    withState("theme", "setTheme", null),
    withState("themes", "setThemes", List()),
    withHandlers<ThemeProps & ThemeState, ThemeHandler>({
        onSelectTheme: ({ channel, setTheme }) => (theme) => {
            setTheme(theme);
            channel.emit("selectTheme", theme);
        },
        onReceiveThemes: ({ setTheme, setThemes, channel }) => (newThemes: Theme[]) => {
            const themes = List(newThemes);
            setThemes(List(themes));
            if (themes.count() > 0) {
                const theme = themes.first();
                setTheme(theme);
                channel.emit("selectTheme", theme);
            }
        },
    }),
    lifecycle<BaseComponentProps, BaseComponentProps>({
        componentDidMount() {
            const { channel, onReceiveThemes } = this.props;
            channel.on("setThemes", onReceiveThemes);
        },
        componentWillUnmount() {
            const { channel, onReceiveThemes } = this.props;
            channel.removeListener("setThemes", onReceiveThemes);
        },
    }),
    branch<BaseComponentProps>(
        ({ theme }) => !theme,
        renderNothing,
    ),
)(BaseComponent);

const RowStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    height: "45px",
    padding: "15px",
};

const ButtonStyle: React.CSSProperties = {
    border: "1px solid #BBB",
    borderRadius: "6px",
    color: "#BBB",
    padding: "15px 10px",
    margin: "7px",
    cursor: "pointer",
};

const SelectedButtonStyle: React.CSSProperties = {
    ...ButtonStyle,
    borderColor: "#666",
    color: "#666",
    fontWeight: "bold",
};
