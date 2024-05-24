// Location States - Current default location is 'us-east'
export let currentLocation: string = 'us-east';

/**
* Sets the location to one of the predefined valid locations.
 * 
 * This function updates the `currentLocation` variable if the provided
 * location is valid. Valid locations include 'us-east', 'us-west', 'eu-west',
 * 'sa-east', 'eu-central', and 'ap-southeast'. The function also returns
 * an object indicating whether the operation was successful or not, along
 * with a message.
 * 
 * @param {string} location - The new location to set. This value will be
 * converted to lowercase and trimmed of whitespace before validation.
 * 
 * @returns {{success: boolean, message: string}} - An object containing
 * the result of the operation:
 *   - `success` (boolean): `true` if the location was successfully set,
 *     `false` otherwise.
 *   - `message` (string): A message describing the result of the operation.
 */
export const setLocation = (location: string) => {
    const locations: string[] = ['us-east', 'us-west', 'eu-west', 'sa-east', 'eu-central', 'ap-southeast'];

    // Clean up the input
    location = location?.toString()?.toLowerCase()?.trim();

    // Check if the provided location is valid and return sucess or error message
    if (locations.includes(location)) {
        currentLocation = location;
        return {
            success: true,
            message: `Location set to ${location}`
        };
    } else {
        console.error(`Invalid location: ${location}`);
        return {
            success: false,
            message: `Invalid location: ${location}`
        };
    }
}
