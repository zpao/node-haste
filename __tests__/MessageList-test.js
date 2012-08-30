/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 * @emails javascript@lists.facebook.com voloko@fb.com
 */

describe("MessageList", function() {
  var MessageList = require('../lib/MessageList');
  var cli = require('../lib/cli');

  it('should add different types of messages', function() {
    var list = new MessageList();
    list.addMessage('foo.js', 'js', 'message');
    list.addWarning('foo.js', 'js', 'warning');
    list.addError('foo.js', 'js', 'error');
    list.addClowntownError('foo.js', 'js', 'clowntown');
    expect(list.messages.length).toBe(4);
  });

  it('should render error with bold', function() {
    var list = new MessageList();
    list.addWarning('foo.js', 'js', 'warning text');
    expect(list.render()).toContain('warning text');
    expect(list.render()).toContain(cli.bold('Warning'));
  });

  it('should render error with awesome', function() {
    var list = new MessageList();
    list.addError('foo.js', 'js', 'error text');
    expect(list.render()).toContain('error text');
    expect(list.render()).toContain(cli.awesome('Error'));
  });

  it('should render error with awesome', function() {
    var list = new MessageList();
    list.addClowntownError('foo.js', 'js', 'clowntown');
    expect(list.render()).toContain('clowntown');
    expect(list.render()).toContain(cli.awesome('Error'));
  });

  it('should group messages by file', function() {
    var list = new MessageList();
    list.addError('foo.js', 'js', 'error');
    list.addClowntownError('foo.js', 'js', 'clowntown');
    expect(list.render()).toContain(cli.bold('Messages'));
  });

  it('expected to merge lists', function() {
    var list1 = new MessageList();
    list1.addWarning('a', 'b', '1');
    list1.addError('a', 'b', '2');

    var list2 = new MessageList();
    list2.addClowntownError('a', 'b', '3');

    list2.merge(list1);
    expect(list2.messages.length).toBe(3);
  });

  it('should reuse objects created through the factory', function() {
    MessageList.clearCache();
    var list = MessageList.create();
    list.addWarning('a', 'b', '1');

    list.recycle();
    expect(list.messages.length).toBe(0);
    expect(MessageList.create()).toBe(list);
  });
});