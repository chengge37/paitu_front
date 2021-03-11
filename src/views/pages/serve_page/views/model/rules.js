import { isEmpty_form, validatePhone } from '@/util/validate.js'
export const rules = {
    title: [
        {
            required: true,
            trigger: 'blur',
            validator: isEmpty_form
        }
    ],
    real_name: [
        {
            required: true,
            trigger: 'blur',
            validator: isEmpty_form
        }
    ],
    sex: [
        {
            required: true,
            trigger: 'blur',
            validator: isEmpty_form
        }
    ],
    header_pic: [
        {
            required: true,
            trigger: 'blur',
            validator: isEmpty_form
        }
    ],
    city_code: [
        {
            required: true,
            trigger: 'blur',
            validator: isEmpty_form
        }
    ],
    mobile: [
        {
            required: true,
            trigger: 'blur',
            validator: validatePhone
        }
    ],
    height: [
        {
            required: true,
            trigger: 'blur',
            validator: isEmpty_form
        }
    ],
    weight: [
        {
            required: true,
            trigger: 'blur',
            validator: isEmpty_form
        }
    ],
    waist: [
        {
            required: true,
            trigger: 'blur',
            validator: isEmpty_form
        }
    ],
    shoes: [
        {
            required: true,
            trigger: 'blur',
            validator: isEmpty_form
        }
    ],
    nation_id: [
        {
            required: true,
            trigger: 'blur',
            validator: isEmpty_form
        }
    ],
    style: [
        {
            required: true,
            trigger: 'blur',
            validator: isEmpty_form
        }
    ],
    type: [
        {
            required: true,
            trigger: 'blur',
            validator: isEmpty_form
        }
    ],
    info: [
        {
            required: true,
            trigger: 'blur',
            validator: isEmpty_form
        }
    ],
    hair: [
        {
            required: true,
            trigger: 'blur',
            validator: isEmpty_form
        }
    ],
    skin: [
        {
            required: true,
            trigger: 'blur',
            validator: isEmpty_form
        }
    ],
    face: [
        {
            required: true,
            trigger: 'blur',
            validator: isEmpty_form
        }
    ],
    wingspan: [
        {
            required: true,
            trigger: 'blur',
            validator: isEmpty_form
        }
    ],
    leg: [
        {
            required: true,
            trigger: 'blur',
            validator: isEmpty_form
        }
    ],
    shoulder: [
        {
            required: true,
            trigger: 'blur',
            validator: isEmpty_form
        }
    ],
    eyelid: [
        {
            required: true,
            trigger: 'blur',
            validator: isEmpty_form
        }
    ],
    is_out: [
        {
            required: true,
            trigger: 'blur',
            validator: isEmpty_form
        }
    ],
    is_translate: [
        {
            required: true,
            trigger: 'blur',
            validator: isEmpty_form
        }
    ],
    lan_one: [
        {
            required: true,
            trigger: 'blur',
            validator: isEmpty_form
        }
    ],
    lan_two: [
        {
            required: true,
            trigger: 'blur',
            validator: isEmpty_form
        }
    ],
    nick: [{
        required: true,
        trigger: 'blur',
        validator: isEmpty_form
    }],
    avatar: [{
        required: true,
        trigger: 'blur',
        validator: isEmpty_form
    }],
    province: [{
        required: true,
        trigger: 'blur',
        validator: isEmpty_form
    }],
    city: [{
        required: true,
        trigger: 'blur',
        validator: isEmpty_form
    }],
    address_ditu: [{
        required: true,
        trigger: 'blur',
        validator: isEmpty_form
    }],
    addressPOI: [{
        required: true,
        trigger: 'blur',
        validator: isEmpty_form
    }],

}