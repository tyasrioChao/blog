---
title: 邮件服务系统
date: 2021-06-10
sidebar: 'auto'
categories:
 - 笔记
tags:
- mail
- server
publish: true
---


最近在做的项目中搭建了一个 smtp 服务器，但是有关邮件整体的结构还不是很清楚，就记录一下此次的学习内容。

## 邮件系统的组成

### MUA(Mail User Agent)

邮件用户代理，即我们平时使用的各类邮件软件（Outlook, Foxmail 等）,通过 SMTP 协议(rfc6409)，向你邮箱的 SMTP 服务器发送你的邮件信息。

### MSA(Mail Submission Agent)

邮件提交代理，接受 MUA 发送来的邮件,然后将收到的邮件会发送到 MTA。此处一般做用户认证等。使用 SMTP 协议。

### MTA(Mail Transfer Agent)

邮件传输代理, 从 MSA 传递的邮件，根据域名判断是否是外部邮箱，是的话转发给目标的 MTA，如果是内部邮箱的话会直接发送给 MDA。

### MDA(Mail Delivery Agent)

邮件投递代理，将 MTA 收到的邮件发送到每个用户的邮箱。只是为了让 MUA 能够读取 MTA 收到的邮件而进行本地分类配送，不涉及系统间的邮件发送。现在，MDA 有更多的功能。例如，根据邮件的服务商的不同，检查是否添加病毒的病毒检查器、标记垃圾邮件的垃圾邮件过滤器功能，邮件列表功能、自动处理收到邮件的功能、长期不在的情况下可以自动回答不在的功能等。

### MRA(Mail Retrieval Agent)

邮件检索（取回）代理，把每个邮箱里存储的邮件转发给 MUA。有从 MUA 连接进行认证的功能，一般分为 POP 服务器或 IMAP 服务器等。保存 MDA 分类后的邮件文件夹内的信息。使用 MUA 连接 MRA 的话会发送保存的信息和信息。此外，还具有删除旧消息的功能。MRA 有 POP3（Post Office Protocol）和 IMAP（Internet Message Access Protocol）。

## 运作流程

下图说明一般寄送 Email 的流程，假设 Alice 利用电子邮件客户端写了一封电子邮件，输入收信人 Bob 的 Email 地址，按下「送信」钮后，后续的流程如下：
```
  1. Alice 的邮件客户端（MUA）将邮件转换为 Email 的格式，利用送件协定（Submission Protocol，SMTP中的一种规范）将 Email 送到邮件提交代理（MSA），在此例中是smtp.a.org，由 Alice 的互联网服务供应商运作。

  2. 邮件提交代理会看SMTP协定中的目的地址（而不是邮箱的开头），在此例中是bob@b.org。电子邮件地址是一串格式如localpart@exampledomain的字串。 @前面的是电子邮件地址的区域部份，多半是收信人的用户名称，后面的则是域名或是完整网域名称（FQDN）。邮件投递代理（MDA）会将域名转换为网域名称系统（DNS）中邮件服务器的完整网域名称。

  3. b.org网域的网域名称系统ns.b.org，会回应在此域名内的邮件服务器，在此例中是mx.b.org，一个由 Bob 的互联网服务供应商运营的邮件服务器。

  4. smtp.a.org利用SMTP协定传送信息给mx.b.org。

  在邮件送达最后的邮件派递代理之前，服务器可能要将邮件派递给其他的服务器，即MTA之间的信息传递。

  1. 邮件派递代理将邮件派递到用户 Bob 的邮箱。
  2. Bob 按下邮件客户端软件的「收信」按钮，利用POP3协议或是IMAP协议取得邮件。
```

![邮件流程](/images/note/400px-Email.svg.png)

## SMTP 服务器

由于 SMTP 服务器有邮件转发的功能，向 SMTP 服务器发送信息时使用 25 号端口的话，并不需要认证。但是没有认证的话，就会导致了 spam/virus 邮件的泛滥，从而衍生出了 OP25B(Outbound Port 25 Blocking)的规定，即禁止直接向其他的 mail server 的 25 号端口发送邮件。

在这个规定下，只能先向自身邮箱所属的 ISP（Internet Service Provider）发送邮件（即你的邮件@后面的域名），再由邮箱的 ISP 转发邮件。但是当你处于一个新的网络环境时，由于 OP25B 的存在，这个网络环境也会拒绝你向你的 ISP 发送邮件，所以近代使用 587 端口来代替，使用这个端口发送邮件时需要进行用户认证（转发时不需要认证依旧使用 25 号端口）。因此，这里的 smtp 服务器又叫做 E(Extended)SMTP。(相较于普通的多了 SMTP-AUTH 的认证)

### 常见端口

一般常见的端口有 25，587，465，2525。上面已经讲过 25 和 587 了，现在说明一下 465 和 2525。

465 也是需要认证的端口，与 587 不同的是，465 使用的是 SSL/TLS，587 使用的是 STARTTLS。

而 2525 端口则是由于 OP25B，为了缓解该问题，很多 ESP 将端口 2525 作为替代方案所产生的。

### 如何送信

DNS 中一般有 A 类 record(IPV4)，Cname， Mx record 等，其中 Mx record 则是用于邮件服务器。在 MTA 收到邮件后，根据送信目标的邮箱地址，解析域名从而转发邮件。

### 使用 SMTP 服务器进行送信

下面是使用控制台来进行送信测试的命令与截图。

另外，在对 gmail 进行测试时，额外需要进行下面低安全性允许的设定。

https://myaccount.google.com/lesssecureapps

使用 SSL/TLS 或 starttls 连接 SMTP 的 465 和 587 端口的命令
``` shell
# 这里指定crlf可避免在LINUX系统下按ENTER无法结束的问题, ign_eof可以避免输入的EOF导致连接失效
openssl s_client -connect smtp.gmail.com:465 -crlf -ign_eof
# 这里使用starttls连接smtp587端口的命令不同，需要追加-starttls prot的option
# 这里prot的类型可以是smtp, lmtp, pop3, imap, ftp等
# openssl s_client -connect smtp.gmail.com:587 -starttls smtp -crlf -ign_eof
HELO smtp.gmail.com
AUTH LOGIN
用户名（Base64编码）
密码（Base64编码）
MAIL FROM: <tyasio.bii@gmail.com>
RCPT TO: <tyasriochao@gmail.com>
DATA
Subject: test

test test
.
quit
```

 控制台与测试结果的截图

![465端口测试](/images/note/smtp465port.png)

![收到邮件](/images/note/receive-mail.png)

## 收信服务器(IMAP，POP3)

### 什么是 IMAP、POP3 以及 Exchange Server

POP3 将收到的信件保存在单个文件夹中，IMAP 将管理在多个文件夹中。两者在使用方法上也有很大的不同。使用 POP3 的情况下，将 MRA 积累的信息集中下载到电脑后再看。

另一方面，使用 IMAP 时，消息基本上会在 IMAP 服务器上进行整理和保存。用户使用 MUA 连接到服务器，并查看其中整理的信件。在 POP3 中，像职场和家一样，从多个环境访问同一 MRA 的情况下，在某个环境中，一旦整理好的信息必须在其他环境重新整理。如果使用 IMAP 的话，邮件文件夹会在网上共享，所以可以避免这种麻烦。

另外，MicroSoft 微软的 Exchange 则不仅仅是向 POP 和 IMAP 一样的操作邮件，而是追加了一套 MAPI 邮件应用编程接口，在邮件的基础上可以和别的应用软件协同。

### 常见端口

和 SMTP 同样，POP3 中如果是不需要认证的端口为 110，现在一般为需要认证的 995。

同理，IMAP 为 143（无认证）与 993（有认证）。

### 通过 POP，IMAP 服务器进行收信

下面给出连接用的 Command，连接到 Gmail 服务器后，使用参考文章中的 POP3 Command 和 IMAP Command 所说明步骤进行操作。
```
# 虽然starttls支持pop3和IMAP，但是Gmail并不可以
openssl s_client -connect pop.gmail.com:995 -crlf
openssl s_client -connect imap.gmail.com:993 -crlf
```

POP 连接与查询的截图

![pop connect](/images/note/pop-connect.jpg)

## 总结

经过大量的翻阅资料，以及自己的尝试，总结出来的描述有可能还有一些问题。

## 参考文章

*   [電子メールが届くまで](https://titechcomp.github.io/y18-il1j/32-delivery.html)
*   [Wiki: Email](https://en.wikipedia.org/wiki/Email)
*   [Wiki: MAPI](https://en.wikipedia.org/wiki/MAPI)
*   [SMTP Submission Port](https://www.infraexpert.com/study/tcpip18.html)
*   [SMTP Command](http://ash.jp/net/telnet_smtp.htm)
*   [POP3 Command](http://ash.jp/net/telnet_pop3.htm)
*   [IMAP Command](https://tewarid.github.io/2011/05/10/access-imap-server-from-the-command-line-using-openssl.html)
*   [RFC1939: Post Office Protocol - Version 3](https://datatracker.ietf.org/doc/html/rfc1939)
*   [RFC3501: Internet Message Access Protocol - Version 4rev1](https://datatracker.ietf.org/doc/html/rfc3501)
*   [RFC5321: Simple Mail Transfer Protocol](https://datatracker.ietf.org/doc/html/rfc5321)
*   [RFC5598: Internet Mail Architecture](https://datatracker.ietf.org/doc/html/rfc5598)
*   [RFC6409: Message Submission for Mail](https://datatracker.ietf.org/doc/html/rfc6409)