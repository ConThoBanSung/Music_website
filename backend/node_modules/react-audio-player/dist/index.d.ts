import React, { Component, ReactNode, CSSProperties } from 'react';
interface ReactAudioPlayerProps {
    autoPlay?: boolean;
    children?: ReactNode;
    className?: string;
    controls?: boolean;
    controlsList?: string;
    crossOrigin?: string;
    id?: string;
    listenInterval?: number;
    loop?: boolean;
    muted?: boolean;
    onAbort?: (e: Event) => void;
    onCanPlay?: (e: Event) => void;
    onCanPlayThrough?: (e: Event) => void;
    onEnded?: (e: Event) => void;
    onError?: (e: Event) => void;
    onListen?: (time: number) => void;
    onLoadedMetadata?: (e: Event) => void;
    onPause?: (e: Event) => void;
    onPlay?: (e: Event) => void;
    onSeeked?: (e: Event) => void;
    onVolumeChanged?: (e: Event) => void;
    preload?: '' | 'none' | 'metadata' | 'auto';
    src?: string;
    style?: CSSProperties;
    title?: string;
    volume: number;
}
declare class ReactAudioPlayer extends Component<ReactAudioPlayerProps> {
    static propTypes: Object;
    static defaultProps: ReactAudioPlayerProps;
    audioEl: React.RefObject<HTMLAudioElement>;
    listenTracker?: number;
    onError: (e: Event) => void | undefined;
    onCanPlay: (e: Event) => void | undefined;
    onCanPlayThrough: (e: Event) => void | undefined;
    onPlay: (e: Event) => void;
    onAbort: (e: Event) => void;
    onEnded: (e: Event) => void;
    onPause: (e: Event) => void;
    onSeeked: (e: Event) => void;
    onLoadedMetadata: (e: Event) => void;
    onVolumeChanged: (e: Event) => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: ReactAudioPlayerProps): void;
    /**
     * Set an interval to call props.onListen every props.listenInterval time period
     */
    setListenTrack(): void;
    /**
     * Set the volume on the audio element from props
     * @param {Number} volume
     */
    updateVolume(volume: number): void;
    /**
     * Clear the onListen interval
     */
    clearListenTrack(): void;
    render(): JSX.Element;
}
export default ReactAudioPlayer;
