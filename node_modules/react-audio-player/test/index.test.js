/* eslint-disable */
import React from 'react';
import ReactDOM, { findDOMNode, render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import ReactAudioPlayer from '../src/index.tsx';

jest.useFakeTimers();

describe('ReactAudioPlayer', function() {
  const song = './fixtures/turkish_march.ogg';

  test('renders an audio element', function() {
    const instance = ReactTestUtils.renderIntoDocument(
      <ReactAudioPlayer />
    );

    const instanceEl = ReactDOM.findDOMNode(instance);

    expect(instanceEl.tagName).toBe('AUDIO');
  });

  test('sets the loop attribute if provided', function() {
    const instance = ReactTestUtils.renderIntoDocument(
      <ReactAudioPlayer
        src={song}
        loop
      />
    );

    const instanceEl = ReactDOM.findDOMNode(instance);

    expect(instanceEl.getAttribute('loop')).not.toBe(null);
  })

  test('sets title', function() {
    const instance = ReactTestUtils.renderIntoDocument(
      <ReactAudioPlayer
        src={song}
        title="Turkish march"
      />
    );

    const instanceEl = ReactDOM.findDOMNode(instance);

    expect(instanceEl.getAttribute("title")).toBe("Turkish march");
  })

  test('receives all custom props', function() {
    const instance = ReactTestUtils.renderIntoDocument(
      <ReactAudioPlayer
        src={song}
        name="custom-name"
        data-id="custom-data"
        controlsList="nodownload"
      />
    );

    const props = Object.keys(instance.props);

    expect(props).toContain('name');
    expect(props).toContain('data-id');
    expect(props).toContain('controlsList');
  });

  test('does not crash', function() {
    const onListen = jest.fn();
    const instance = ReactTestUtils.renderIntoDocument(
      <ReactAudioPlayer
        src={song}
        onListen={onListen}
      />
    );

    instance.setListenTrack();

    ReactTestUtils.act(() => jest.advanceTimersByTime(10000));
    expect(onListen).toHaveBeenCalledTimes(1);

    expect(instance.audioEl.current).toBeTruthy()

    // unmount to set audioEl.current to null
    unmountComponentAtNode(findDOMNode(instance).parentElement);

    expect(instance.audioEl.current).toBe(null);

    expect(() => {
      ReactTestUtils.act(() => jest.advanceTimersByTime(10000))
    }).not.toThrow()
  })
});
