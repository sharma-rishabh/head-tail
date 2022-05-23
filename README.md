## Head

`usage: head [-n lines | -c bytes] [file ...]`

```
head file
  This filter displays the first ten of the specified file.

head -n count file
  Specify the count of lines you want from a file.

head -c bytes file
  Specify the bytes/characters you want from a file.
```

## Tail

`usage: tail [-c # | -n #] [file ...]`

```
tail file
  This filter displays the last ten of the specified file.

tail -n count file
  Specify the line from which you want the content.

tail -c count file
  Specify the byte/count from which you want the content.
```
