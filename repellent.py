import os
import random
import time
from pygame import mixer

# Directories for pre-stored sounds
ELEPHANT_SOUND_DIR = "elephant_sounds/"
TIGER_SOUND_DIR = "tiger_sounds/"

def play_random_sound(animal_type):
    """
    Play a random sound from the respective directory based on animal type.
    :param animal_type: "elephant" or "tiger"
    """
    # Select the correct directory
    if animal_type == "elephant":
        sound_dir = ELEPHANT_SOUND_DIR
    elif animal_type == "tiger":
        sound_dir = TIGER_SOUND_DIR
    else:
        print("Invalid animal type. Please use 'elephant' or 'tiger'.")
        return

    # Check if the directory exists and has files
    if not os.path.exists(sound_dir):
        print(f"Directory {sound_dir} does not exist.")
        return

    sound_files = [f for f in os.listdir(sound_dir) if f.endswith('.wav')]
    if not sound_files:
        print(f"No sound files available in {sound_dir}.")
        return

    # Select a random sound file
    sound_file = random.choice(sound_files)
    sound_path = os.path.join(sound_dir, sound_file)
    print(f"Playing sound: {sound_path}")

    # Initialize the mixer and play the sound
    mixer.init()
    mixer.music.load(sound_path)
    mixer.music.play()

    # Wait for the sound to finish playing
    while mixer.music.get_busy():
        time.sleep(0.1)

    # Add a delay of 10 seconds after playback
    print("Waiting for 10 seconds...")
    time.sleep(10)

    print(f"Finished playing sound for {animal_type}.")

# Example usage
if __name__ == "__main__":
    animal_detected = "tiger"  # Replace this with your model's input ("elephant" or "tiger")
    play_random_sound(animal_detected)
