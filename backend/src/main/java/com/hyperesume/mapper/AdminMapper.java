package com.hyperesume.mapper;

import com.hyperesume.model.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface AdminMapper {
    @Select("SELECT u.*, p.first_name, p.last_name, p.email, p.phone, " +
            "p.education, p.skills, p.experience, p.projects, p.certifications " +
            "FROM users u " +
            "LEFT JOIN profile p ON u.id = p.user_id")
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "username", column = "username"),
            @Result(property = "role", column = "role"),
            @Result(property = "profile.firstName", column = "first_name"),
            @Result(property = "profile.lastName", column = "last_name"),
            @Result(property = "profile.email", column = "email"),
            @Result(property = "profile.phone", column = "phone"),
            @Result(property = "profile.education", column = "education"),
            @Result(property = "profile.skills", column = "skills"),
            @Result(property = "profile.experience", column = "experience"),
            @Result(property = "profile.projects", column = "projects"),
            @Result(property = "profile.certifications", column = "certifications")
    })
    List<User> getAllUsers();

    @Select("SELECT u.*, p.first_name, p.last_name, p.email, p.phone, " +
            "p.education, p.skills, p.experience, p.projects, p.certifications " +
            "FROM users u " +
            "LEFT JOIN profile p ON u.id = p.user_id " +
            "WHERE u.id = #{id}")
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "username", column = "username"),
            @Result(property = "role", column = "role"),
            @Result(property = "profile.firstName", column = "first_name"),
            @Result(property = "profile.lastName", column = "last_name"),
            @Result(property = "profile.email", column = "email"),
            @Result(property = "profile.phone", column = "phone"),
            @Result(property = "profile.education", column = "education"),
            @Result(property = "profile.skills", column = "skills"),
            @Result(property = "profile.experience", column = "experience"),
            @Result(property = "profile.projects", column = "projects"),
            @Result(property = "profile.certifications", column = "certifications")
    })
    User getUserById(@Param("id") Long id);

    @Update({
            "<script>",
            "UPDATE users",
            "SET username = #{username},",
            "    role = #{role}",
            "WHERE id = #{id}",
            "</script>"
    })
    void updateUser(User user);

    @Delete("DELETE FROM users WHERE id = #{id}")
    void deleteUser(@Param("id") Long id);

    @Delete("DELETE FROM sys_role_user WHERE user_id = #{userId}")
    void deleteUserRoles(@Param("userId") Long userId);

    @Insert("INSERT INTO sys_role_user (user_id, role_id) VALUES (#{userId}, #{roleId})")
    void addUserRole(@Param("userId") Long userId, @Param("roleId") Integer roleId);

    @Select("SELECT COUNT(*) FROM profile WHERE user_id = #{userId}")
    int checkProfileExists(@Param("userId") Long userId);

    @Insert("INSERT INTO profile (user_id, first_name, last_name, email, phone, education, skills, experience, projects, certifications) "
            +
            "VALUES (#{id}, #{profile.firstName}, #{profile.lastName}, #{profile.email}, #{profile.phone}, " +
            "#{profile.education}, #{profile.skills}, #{profile.experience}, #{profile.projects}, #{profile.certifications})")
    void createProfile(User user);

    @Update({
            "<script>",
            "UPDATE profile",
            "SET first_name = #{profile.firstName},",
            "    last_name = #{profile.lastName},",
            "    email = #{profile.email},",
            "    phone = #{profile.phone}", // Only update the fields that admin dashboard modifies
            "WHERE user_id = #{id}",
            "</script>"
    })
    void updateProfile(User user);
}