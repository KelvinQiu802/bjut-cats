# A Mini Program for Cats

<p align="center">
<img src="https://imgbed.codingkelvin.fun/uPic/newlogo235324.png" width=280px/>
</p>

## Usage

### Data Collection

1. The data needs to be inputted into a table.
   1. The basic logic is that the program reads the data from the table.
   2. This project uses [Tencent Doc](https://docs.qq.com), and a read-only example can be found at [here](https://docs.qq.com/sheet/DR0ZTREtQTm9Gb29O?tab=BB08J2).
2. Once the data is inputted into the table, it can be exported as a `.csv` file.
3. Copy the exported `.csv` file into the `data` folder.

### Build the App

```shell
$ pnpm install
$ pnpm run data
$ pnpm run dev:weapp
or
$ pnpm run build:weapp
```

### Deploy

- Use Wechat Devtools to deploy the mini program.

### Plan for 2.0

- [ ] Redesign UI/UX
- [ ] Implement an Image Slider (support multiple images for each cat)
- [ ] Add an Admin Management System (Allow user to edit data without accessing the database)
- [ ] Create an Image Board (allow users to upload cat images)
- [ ] Refactor the Backend with Flask in Python 3
- [ ] Record feedings (upload an image for each checkpoint)

## Thanks

The conceptualization of this project was stimulated by the innovative work of the [Stray Cats Caring Association at Peking University](https://github.com/SCCAPKU). In addition, certain elements of the UI design and features were influenced by their [mini program](https://github.com/SCCAPKU/miniprogram).

## License

> MIT
