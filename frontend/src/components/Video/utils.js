const ndarray = require('ndarray');
const linspace = require('ndarray-linspace');
const cwise = require('cwise');
const zeros = require('zeros');
const fft = require('ndarray-fft');
const ops = require('ndarray-ops');


export class HeartRateFinder {
    constructor(num_samples) {
        this.averages_buffer = [];
        this.times = [];
        this.buf_siz = num_samples;
        this.startTime = Date.now();
        this.heartRate = 0;
    }

    updateHeartRate(imageArr) {
        this.averages_buffer.push(HeartRateFinder.getAverage(imageArr));
        let currTime = Date.now() - this.startTime;
        this.times.push(currTime);

        // clean up buffer if it exceeds largest size
        if (this.averages_buffer.length > this.buf_siz) {
            this.averages_buffer.splice(0,1);
            this.times.splice(0,1);
        }

        if (this.averages_buffer.length > 10) {
            const fps = this.buf_siz / (this.times[this.times.length - 1] - this.times[this.times.length - 2]);
            //console.log(fps);
            const even_times = linspace(this.times[0], this.times[this.times.length-1], this.buf_siz);

            let interpolated = interp(even_times, this.times, this.averages_buffer);

            // multiply by hamming window and mean center
            mul_arrays(interpolated, hamming(this.buf_siz));
            add_scalar(interpolated,-mean(interpolated));

            let complex = zeros([interpolated.size]);

            // dear god this is awful
            fft(1, interpolated, complex);


            // get frequency array
            let freqs = linspace(0,this.buf_siz/2 + 1, this.buf_siz/2 + 1);
            mul_scalar(freqs, fps/this.buf_siz * 60);
            //console.log("is freqs ok");
            //console.log(freqs);


            this.heartRate = get_freq_between_bounds(interpolated, complex, freqs, 50, 150);
            //console.log("wow progress");
            //console.log(this.heartRate);


            //let hamming = hamming_func(linspace(0,1,this.buf_siz),this.buf_siz);
        }

    }

    static getAverage(imageArr) {
        // input format: image is a 1-D array with 4 elements corresponding to RGBA
        let r_sum = 0;
        let g_sum = 0;
        let b_sum = 0;
        let num_pixels = imageArr.length / 4;
        // get average r value
        for (let i = 0; i < imageArr.length; i++) {
            if (i % 4 === 0) r_sum += imageArr[i];
            else if (i % 4 === 1) g_sum += imageArr[i];
            else if (i % 4 === 2) b_sum += imageArr[i];
        }

        let r_avg = r_sum / num_pixels;
        let g_avg = g_sum / num_pixels;
        let b_avg = b_sum / num_pixels;
        return (r_avg + g_avg + b_avg) / 3;
    }
}

const mul_scalar = cwise({
    args: ["array", "scalar"],
    body: function(a,n) {
        a *= n;
    }
});

const add_scalar = cwise({
    args: ["array", "scalar"],
    body: function(a,n) {
        a = a + n;
    }
});

const mul_arrays = cwise({
    args: ["array", "array"],
    body: function(a,b) {
        a *= b;
    }
});

const mean = (arr) => {
    return ops.sum(arr) / arr.size;
}

const hamming_func = cwise({
    args: ["array", "scalar"],
    body: function(a, m) {
        a = 0.54 - 0.46 * Math.cos(2 * Math.PI * a/(m-1));
    }
});

const hamming = (num_points) => {
    let l = ndarray([...Array(num_points).keys()]);
    hamming_func(l,num_points);
    return l;
}

const get_freq_between_bounds = (real, imag, freqs, min_freq, max_freq) => {
    let max_mag = 0;
    let max_idx = -1;
    let idxs = [];
    for (let i = 0; i < freqs.size; i++) {
        if (freqs.get(i) >= min_freq && freqs.get(i) <= max_freq) idxs.push(i);
    }

    idxs.forEach(i => {
        let magnitude = Math.pow(real.get(i),2) + Math.pow(imag.get(i),2);
        if (magnitude > max_mag) {
            max_mag = magnitude;
            max_idx = i;
        }
    });
    return freqs.get(max_idx);
}


const interp = (x_coords, xp, yp) => {
    let output = zeros([x_coords.size]);
    if (xp.length !== yp.length) {
        throw "x and y dimensions do not match!";
    }
    let ip = 0;
    let x0 = xp[ip];
    let x1 = xp[ip+1];
    let y0 = yp[ip];
    let y1 = yp[ip+1];

    for (let i = 0; i < x_coords.size; i++) {
        if (x_coords.get(i) > x1) {
            ip++;
            x0 = xp[ip];
            x1 = xp[ip+1];
            y0 = yp[ip];
            y1 = yp[ip+1];
        }
        output.set(i,y0 + (x_coords.get(i) - x0) * ((y1-y0)/(x1-x0)));
    }
    return output;
}

export function getForeheadCoords(face_x, face_y, face_width, face_height) {
    let forehead_x = face_x + face_width * 0.35;
    let forehead_y = face_y;

    let forehead_width = face_width * 0.3;
    let forehead_height = face_height * 0.1;

    return {
        "x": forehead_x,
        "y": forehead_y,
        "width": forehead_width,
        "height": forehead_height
    };
}


