% Step 1: Load the audio file
[audioData, sampleRate] = audioread(''); % Update with your file path

% Step 2: Define the desired frequency
targetFrequency = 400; % Desired frequency in Hz

% Step 3: Calculate the duration and length of the audio
n = length(audioData);
duration = n / sampleRate; % Duration in seconds

% Step 4: Estimate the original frequency
originalFrequency = 1 / (duration / n); % This is a rough estimate

% Step 5: Calculate the pitch shifting ratio
pitchShiftRatio = targetFrequency / originalFrequency;

% Step 6: Short-Time Fourier Transform (STFT) parameters
windowLength = 1024; % Length of the window for STFT
hopSize = windowLength / 4; % Overlap between windows
numWindows = floor((n - windowLength) / hopSize) + 1; % Number of windows

% Step 7: Create a Hamming window
hammingWindow = 0.54 - 0.46 * cos(2 * pi * (0:windowLength-1)' / (windowLength - 1));

% Step 8: Initialize the output signal
outputSignal = zeros(n, 1);

% Step 9: Apply STFT and pitch shift
for i = 1:numWindows
    % Extract the current window
    startSample = (i - 1) * hopSize + 1;
    endSample = startSample + windowLength - 1;

    % Adjust the endSample to not exceed the audioData length
    if endSample > n
        endSample = n; % Adjust to the length of the audio
        windowedSignal = audioData(startSample:endSample); % Adjusted window
    else
        windowedSignal = audioData(startSample:endSample);
    end

    % Apply the Hamming window
    windowedSignal = windowedSignal .* hammingWindow(1:length(windowedSignal));

    % Perform FFT
    fftSignal = fft(windowedSignal);
    
    % Shift the phase to change the pitch
    shiftedFFT = zeros(size(fftSignal));
    for f = 1:length(fftSignal)
        shiftedIndex = round(f * pitchShiftRatio);
        
        % Ensure the shifted index is within valid bounds
        if shiftedIndex > 0 && shiftedIndex <= length(shiftedFFT)
            shiftedFFT(shiftedIndex) = fftSignal(f);
        end
    end

    % Perform inverse FFT
    outputWindow = ifft(shiftedFFT, 'symmetric'); % Use 'symmetric' for real output

    % Overlap-add to reconstruct the output signal
    outputSignal(startSample:startSample + length(outputWindow) - 1) = ...
        outputSignal(startSample:startSample + length(outputWindow) - 1) + real(outputWindow);
end

% Step 10: Normalize the output signal to prevent clipping
outputSignal = outputSignal / max(abs(outputSignal));

% Step 11: Save the output as a WAV file
outputFileName = 'bee_buzz_450Hz_pitch_shifted.wav';
audiowrite(outputFileName, outputSignal, sampleRate); % Write to new file

% Display message
fprintf('The audio has been pitch-shifted and saved as %s\n', outputFileName);
