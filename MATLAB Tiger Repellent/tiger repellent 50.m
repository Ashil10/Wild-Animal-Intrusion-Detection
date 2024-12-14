% Parameters
Fs = 200000; % Target sampling frequency (Hz)
duration = 5; % Duration (seconds)
freq = 50000; % High-frequency sine wave (50 kHz)
target_dB = 89; % Target sound pressure level (dB)

% Generate time vector
t = 0:1/Fs:duration;

% Generate 50 kHz sine wave
sineWave = sin(2 * pi * freq * t);

% Normalize sine wave to target dB
referencePressure = 20e-6; % Reference sound pressure (Pa)
desiredAmplitude = referencePressure * 10^(target_dB / 20); % Amplitude from dB
sineWave = sineWave * desiredAmplitude / max(abs(sineWave)); % Scale sine wave

%base sound
[baseSound, baseFs] = audioread('C:\Users\hp-pc\Documents\MATLAB\vervet monkey leopard call.wav'); 
baseSound = baseSound(:, 1); % Use single channel if stereo

% Interpolate base sound to target frequency
newLength = round(length(baseSound) * Fs / baseFs); % New length for target frequency
baseSound = interp1(linspace(0, 1, length(baseSound)), baseSound, linspace(0, 1, newLength)); % Interpolation


if length(baseSound) < length(sineWave)
    % Pad baseSound to match sineWave length
    baseSound = [baseSound; zeros(length(sineWave) - length(baseSound), 1)];
else
    baseSound = baseSound(1:length(sineWave));
end

% Combine sine wave with base sound
combinedSound = sineWave + baseSound; % Add sounds together

% Save the combined sound as a WAV file
audiowrite('tiger_repellent_50kHz.wav', combinedSound, Fs);

disp('50 kHz sine wave with base sound generated and saved as tiger_repellent_50kHz.wav.');
