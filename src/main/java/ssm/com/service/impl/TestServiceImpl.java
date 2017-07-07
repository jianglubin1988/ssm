package ssm.com.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ssm.com.dao.TestMapper;
import ssm.com.domain.Test;
import ssm.com.service.TestService;

@Service("TestService")
public class TestServiceImpl implements TestService{
	
	@Resource
	private TestMapper testMapper;
	
	@Override
	public int deleteByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int insert(Test record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int insertSelective(Test record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Test selectByPrimaryKey(Integer id) {
		return this.testMapper.selectByPrimaryKey(id);
	}

	@Override
	public int updateByPrimaryKeySelective(Test record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int updateByPrimaryKey(Test record) {
		// TODO Auto-generated method stub
		return 0;
	}

}
