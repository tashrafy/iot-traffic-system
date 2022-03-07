import axios from 'axios';
import Hue from './hue.model';
import { hue } from '../../config/environment';

export async function getAll(req, res) {
  const endpoint = `${hue.domain}/api/${hue.username}/lights`;

  try {
    const response = await axios.get(endpoint);
    const data = response.data;

    await Promise.all([
      axios.put(`${endpoint}/2/state`, {
        on: false
      }),
      axios.put(`${endpoint}/3/state`, {
        on: false
      })
    ]);
    return res.json(data);
  } catch (error) {
    return res.status(error.statusCode || 500).send(error.message);
  }
}

export async function modifyState(req, res) {
  const endpoint = `${hue.domain}/api/${hue.username}/lights`;
  console.log("state values original:", req.body);
  try {
    const bri = Math.round((req.body.bri || 100) + 100);
    const stateData = {
      on: true,
      hue: req.body.hue,
      bri: bri > 254 ? 254 : bri
    };
    const response = await axios.put(`${endpoint}/${hue.light_id}/state`, stateData);

    console.log("state values sent:", stateData);
    const data = response.data;

    console.log("response data:", data);

    return res.json(data);
  } catch (error) {
    return res.status(error.statusCode || 500).send(error.message);
  }
}
